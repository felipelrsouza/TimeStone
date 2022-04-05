@extends('layouts.master')

@section('title', 'Tags')
@section('content')




<div id="project-create-container" class="col-md-6 offset-md-3">
    <br>
<h2 class="text-center">Tags</h2>
<br>
@foreach($tags as $tags)
<h6>{{$tags -> id}} - {{$tags -> title}} </h6>

<div style="cursor: pointer" data-id='{{$tags -> id}}' onClick='deleteTag(this)' ><i class="fa-solid fa-trash"></i> Delete<br><br></div>
<br>
@endforeach

<h4>Create a new tag</h4>
<form action="/tags" method="POST">
    @csrf
    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="Tag title.">
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