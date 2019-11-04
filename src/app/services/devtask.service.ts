import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DevtaskService {

  constructor(private http: HttpClient) { }
  // readonly rootUrl = 'http://localhost:3000';
  login(username, password) {
    return this.http.get('http://localhost:3000/authentication?username=' + username + '&password=' + password);
  }
  creatPost(userData) {
    return this.http.post('http://localhost:3000/posts', userData);
  }
  getPosts() {
    return this.http.get('http://localhost:3000/posts');
  }
  deletePost(id) {
    return this.http.delete('http://localhost:3000/posts/' + id);
  }
  likePost(userData) {
    return this.http.patch(`http://localhost:3000/likedPosts/${userData.id}`, userData);
  }
  updatePost(postObj) {
    return this.http.put('http://localhost:3000/posts/' + postObj.id, postObj);
  }
}
