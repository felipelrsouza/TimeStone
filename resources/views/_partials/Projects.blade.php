@section('projects')
@foreach($projects as $projects)
<!--- Activity Group menu -->
<div class="row">
    <div class="col-sm-3 pt-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center text-uppercase">{{$projects -> id}} - {{$projects -> title}}</h5>
                <p class="card-text text-center">{{$projects -> description}}</p>
                <h4 class="text-center">00:00</h4>
            </div>
        </div>
    </div>

</div>
@endforeach
@endsection