<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Activity;
use App\Models\Project;
use App\Models\Tag;

class MainController extends Controller
{
    public function index(){
 
        $activities = Activity::all();
        $projects = Project::all();
        $tags = Tag::all();
      
        return view('welcome',[
            'activities' => $activities,
            'projects' => $projects,
            'tags' => $tags        
        ]);
    }


    public function create(){
        return view('activities.create');
    }

    public function store(Request $request){

        $activity = new Activity;

        $activity -> title = $request -> title;
        $activity -> project = $request -> project;

        $activity -> save();

        return redirect('/');

     }

}

