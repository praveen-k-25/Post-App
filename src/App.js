import {Route, Routes} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import NewPost from "./NewPost";
import Nav from "./Nav";
import PostPage from "./PostPage";
import Missing from "./Missing";
import About from "./About";
import Footer from "./Footer";
import EditPosts from "./EditPosts";
import React from 'react';
import { DataProvider } from "./context/DataContext";

function App() { 
  return (
    <div className="App"> 
      <DataProvider>
        <Header title="Dhuddu Social Media"/>
        <Nav/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="post">
            <Route index element={<NewPost/>}/>
            <Route path=":id" element={<PostPage/>}/>
          </Route>  
          <Route path="edit/:id" element={<EditPosts/>}/>
          <Route path="about" element={ <About/> }/>
          <Route path="*" element={ <Missing/> }/>
        </Routes>   
        <Footer/>   
      </DataProvider>
    </div>
    
  );
}

export default App;
