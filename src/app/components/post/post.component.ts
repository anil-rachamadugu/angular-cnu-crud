import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevtaskService } from 'src/app/services/devtask.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  username: string;
  postform: FormGroup;
  submitted = false;
  posts: any;
  constructor(private _router: Router,
    private fb: FormBuilder,
    private service: DevtaskService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('currentUser');
    this.postform = this.fb.group({
      newPost: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.getPosts();
    this.onReset();
  }
  createNewPost() {
    if (this.postform.valid) {
      const userData = {
        postData: this.postform.controls.newPost.value,
        postTimeAndDate: new Date().toString(),
        postCreatedUser: this.username,
        likedBy: []
      };
      this.service.creatPost(userData).subscribe(
        res => {
          this.toaster.success('your posted created succefully', 'Congratulations');
          this.onReset();
          this.getPosts();
        },
        err => {
          if (err.status === 0) {
            this.toaster.error('Json server is not started', 'Ohh sorry');
          }
        }
      );
    }
  }
  onReset() {
    this.postform.markAsPristine();
  }

  getPosts() {
    this.service.getPosts().subscribe(
      res => {
        this.posts = res;
        this.posts = this.posts.sort((a, b) => Number(b.id) - Number(a.id));
        // console.log(this.posts);
      },
      err => {
        if (err.status === 0) {
          this.toaster.error('Json server is not started', 'Ohh sorry');
        }
      }
    );
  }
  deletePost(id: number) {
    if (confirm('Are you sure do you want delete this post')) {
      this.service.deletePost(id).subscribe(
        res => {
          this.toaster.success('your post was deleted succefully', 'Congratulations');
          this.getPosts();
        },
        err => {
          if (err.status === 0) {
            this.toaster.error('Json server is not started', 'Ohh sorry');
          }
        });
    }
  }
  likePost(id: number) {
    for (const postObj of this.posts) {
      if (postObj.id === id) {
        if (postObj.likedBy.indexOf(this.username) < 0) {
          postObj.likedBy.push(this.username);
          $('#post_' + id).removeClass('btn btn-light');
          $('#post_' + id).addClass('btn btn-primary');
        } else {
          postObj.likedBy.splice(postObj.likedBy.indexOf(this.username), 1);
          $('#post_' + id).removeClass('btn btn-primary');
          $('#post_' + id).addClass('btn btn-light');
        }
        this.service.updatePost(postObj).subscribe(
          (data: any) => {
            // console.log('liked');
          }, err => {
            console.log('failed');
          }
        );
      }
    }
  }
  // checkLiked(id: number) {
  //   console.log('Checking for  :'+id);
  //   for (const postObj of this.posts) {
  //     if (postObj.id === id) {
  //       if (postObj.likedBy.indexOf(this.username) < 0) {
  //         console.log();
  //         return 'btn btn-primary';
  //       }
  //     }
  //   }

  //   return 'btn btn-light';
  // }
  logout() {
    if(confirm('Are you sure do you want to logout')){
    localStorage.removeItem('currentUser');
    this._router.navigate(['login']);
  } else {

  }
  }
}
