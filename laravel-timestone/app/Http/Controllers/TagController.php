<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Tag;

class TagController extends Controller{

    public function index(){
 
        $tags = Tag::all();
      
        return view('/tags',['tags' => $tags]);
    }

    public function store(Request $request){

        $tag = new Tag;

        $tag -> title = $request -> title;
        $tag -> activities = $request -> activities;

        $tag -> save();

        return redirect('/')->with('msg', 'Tag criada com sucesso!');

     }

}

