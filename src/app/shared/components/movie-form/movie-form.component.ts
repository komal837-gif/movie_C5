import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Imovie } from '../../models/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
movieForm!:FormGroup;
isInEditMode:boolean = false;
EditId!:string;

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    this.createForm()
    this.patchVal()
  }

  createForm(){
    this.movieForm = new FormGroup({
      title:new FormControl("",[Validators.required]),
      director:new FormControl("",[Validators.required]),
      year:new FormControl("",[Validators.required]),
      rating:new FormControl("",[Validators.required]),
      poster:new FormControl("",[Validators.required]),
      cast:new FormArray([new FormControl("",[Validators.required])]),
      genre:new FormArray([new FormControl("",[Validators.required])])
    })
  }

  get cast(){
    return this.movieForm.get('cast') as FormArray
  }

  addCast(){
    if(this.cast.valid){
      this.cast.push(new FormControl("",[Validators.required]))
    }
  }

  removeCast(index:number){
    this.cast.removeAt(index)
  }

  get genre(){
    return this.movieForm.get('genre') as FormArray
  }

  addGenre(){
   if(this.genre.valid){
     this.genre.push(new FormControl("",[Validators.required]))
   }
  }

removeGenre(index:number){
  this.genre.removeAt(index)
}

onSubmit(){
  if(this.movieForm.valid){
    let movieObj = this.movieForm.value;
  this.movieService.createMovie(movieObj).subscribe(res=>{
    if(res){
      this.movieForm.reset()
      this.cast.clear()
      this.genre.clear()

      this.addCast()
      this.addGenre()
      this.movieService.newMovie({...movieObj,id:res.name})
    }
  })
  }
}

patchVal(){
  this.movieService.emitEditObj$.subscribe(res=>{
    this.isInEditMode = true;
    this.EditId = res.id;
    this.movieForm.patchValue(res)
  })
}

onUpdate(){
 if(this.movieForm.valid){
  let updatedObj:Imovie = {
  ...this.movieForm.value,
  id:this.EditId
 }

 this.movieService.UpdateMovie(updatedObj).subscribe(res=>{
  if(res){
    this.isInEditMode = false;
    this.movieForm.reset();
    this.cast.clear()
    this.genre.clear()
    this.movieService.updateObj(updatedObj)
  }
 })
 }


}



}
