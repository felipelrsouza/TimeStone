@extends('layouts.master')

@section('title', 'TimeSTONE')
@section('content')




<div id="tags-create-container" class="col-md-6 offset-md-3">
    <h1>Tags</h1>
    <br>
    @foreach($tags as $tag)
    <h6>Title: {{$tag -> title}}</h6><br><br>
    @endforeach

    <h4>Create a new project</h4>
    <form action="/tags" method="POST">
        @csrf
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title" name="title" placeholder="Tag title.">
        </div>
        <input type="submit" class="btn btn-primary" value="Create">
    </form>


</div>

</div>
@endsection