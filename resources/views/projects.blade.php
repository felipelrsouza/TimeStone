@extends('layouts.master')

@section('title', 'Projects')
@section('content')




<div id="project-create-container" class="col-md-6 offset-md-3">
    <br>
<h2 class="text-center">Projects</h2>
<br>
@foreach($projects as $project)
<h6>{{$project -> id}} - {{$project -> title}} - <span style="cursor: pointer" data-id='{{$project -> id}}' onClick='deleteProject(this)' ><i class="fa-solid fa-trash"></i> Delete<br><br></span></h6>


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
    <br>
    <div class="text-center">
<input type="submit" class="btn btn-primary " value="Create">
</div>
</form>


</div>

</div>

<!-- Axios JS -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- General Page JS -->
<script src="/js/general_script.js"></script>

@endsection