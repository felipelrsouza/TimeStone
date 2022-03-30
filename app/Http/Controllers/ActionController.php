<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function index(){
        $title = 'Titulo da atividade';
        $project = 29;
        $tags = [];
        $billable = false;
        $timeList = []; 
      
        return view('welcome',
            [
                'title' => $title,
                'project' => $project,
                'tags' => $tags,
                'billable' => $billable,
                'timeList' => $timeList
            ]);
    }

    public function create(){
        return view('events.create');
    }

}
