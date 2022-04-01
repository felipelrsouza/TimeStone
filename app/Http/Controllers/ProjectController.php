<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Project;

class ProjectController extends Controller{

    public function index(){
 
        $projects = Project::all();
      
        return view('/projects',['projects' => $projects]);
    }

    public function store(Request $request){

        $project = new Project;

        $project -> title = $request -> title;
        $project -> description = $request -> description;

        $project -> save();

        return redirect('/')->with('msg', 'Projeto criado com sucesso!');

     }

}

