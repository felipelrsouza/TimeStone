@extends('layouts.master')

@section('title', 'TimeSTONE')
@section('content')




<div id="project-create-container" class="col-md-6 offset-md-3">
<h1>Projects</h1>
<br>
@foreach($projects as $project)
<h6>Title: {{$project -> title}}</h6>Description: {{$project -> description}}<br><br>
@endforeach

<h4>Create a new project</h4>
<form action="/projects" method="POST">
    @csrf
    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="Project title.">
    </div>
    <div class="form-group">
        <label for="title">Description:</label>
        <textarea name="description" id="description" class="form-control" placeholder="Short project description."></textarea>
    </div>
<input type="submit" class="btn btn-primary" value="Create">
</form>


</div>

</div>
@endsection