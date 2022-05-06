<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Activity;
use App\Models\Project;
use App\Models\Tag;

class MainController extends Controller
{
    public function activityIndex(){
 
        $projects = Project::all();
        $tags = Tag::all();
      
        return view('welcome',[
            'projects' => $projects,
            'tags' => $tags        
        ]);
    }


    public function activityCreate(){
        return view('activities.create');
    }

    public function activityStore(Request $request){

        $activity = new Activity;

        $activity -> title = $request -> title;
        $activity -> project = $request -> project;

        $activity -> save();

        return redirect('/');

     }

    public function projectIndex(){
 
        $projects = Project::all();
      
        return view('/projects',['projects' => $projects]);
    }

    public function store(Request $request){

        $project = new Project;

        $project -> title = $request -> title;
        $project -> description = $request -> description;

        $project -> save();

        return redirect('/projects');

    }
    
     public function tagsIndex(){
 
        $tags = Tag::all();
      
        return view('/tags',['tags' => $tags]);
    }

    public function tagStore(Request $request){

        $tag = new Tag;

        $tag -> title = $request -> title;
        $tag -> activities = $request -> activities;

        $tag -> save();

        return redirect('/')->with('msg', 'Tag criada com sucesso!');

     }

}