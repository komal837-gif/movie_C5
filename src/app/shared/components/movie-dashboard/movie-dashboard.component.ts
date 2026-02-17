import { Component, OnInit } from '@angular/core';
import { Imovie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {
movieArr:Array<Imovie> = []
  constructor(private movieService:MovieService,
    private snack:SnackBarService
  ) { }

  ngOnInit(): void {
    this.getAllMovies()
    this.getNewMovie()
    this.getRemovedId()
    this.getUpdatedObj()
  }

  getAllMovies(){
    this.movieService.fetchAllMovies().subscribe({
      next:data=>{
        this.movieArr = data
        this.snack.ShowSuccessMsg(`All ${data.length} movies fetched successfully!!`)
      },
      error:err=>{
        this.snack.ShowError(err)
      }
    })
  }

  getNewMovie(){
    this.movieService.emitNewMovie$.subscribe({
      next:data=>{
        this.movieArr.unshift(data)
        this.snack.ShowSuccessMsg(`The movie with id ${data.id} is added successfully!!`)
      },
      error:err=>{
        this.snack.ShowError(err)
      }
    })
  }

  getRemovedId(){
    this.movieService.emitRemoveId$.subscribe({
      next:data=>{
        let getIndex = this.movieArr.findIndex(movie=>movie.id === data)
        this.movieArr.splice(getIndex,1)
        this.snack.ShowSuccessMsg(`The movie with id ${data} is removed successfully!!`)
      },
      error:err=>{
        this.snack.ShowError(err)
      }
    })
  }

  getUpdatedObj(){
    this.movieService.emitUpdatedObj$.subscribe({
      next:data=>{
        let getIndex = this.movieArr.findIndex(movie=> movie.id === data.id)
        this.movieArr[getIndex] = data;
        this.snack.ShowSuccessMsg(`The movie with id ${data.id} is updated successfully!!`)
      },
      error:err=>{
        this.snack.ShowError(err)
      }
    })
  }

  
}
