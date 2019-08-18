import React, {Component} from "react";
import { Card } from "antd"
import axios from "axios";

class Question extends Component {

   constructor() 
   {
     state = {
       posts: "",
    }
    axios.get("/api/forum/getAll").then((result) => {
      this.setState({posts: result});
      }
    )
   }

   render(){
      return (this.state.posts.map(post => {
        <Card>post</Card>
      }));
   }
}