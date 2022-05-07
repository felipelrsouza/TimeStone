@extends('layouts.master')

@section('title', 'Tracker')
 @section('content')

 <div class="main-content container align-items-center pt-4">
  <h6>Start tracking a new activity:</h6>

  <!-- Activity menu  -->

  <div id="activity-row-id" class="input-group">

    <button class="sub-activities btn btn-outline-dark btn-secondary d-none" data-type="sub-activities" onclick="actionManager(this)" type="button">
      <i class="fa-solid fa-caret-down"></i>
    </button>



    <input data-type="activity-title" onkeyup="actionManager(this)" type="text" class="activity-title form-control input-line rounded-start " placeholder="What are you working on?" />

    <input data-type="activity-id" type="number" class="act-id-input form-control input-line btn-outline-dark" value="1" min="1" />

    <button data-type="update-id" class="act-id-button btn btn-outline-dark" onclick="actionManager(this)" type="button">
      <i class="fa-solid fa-arrows-rotate"></i>
    </button>

    <button data-type="project" class="project btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false" type="button">
      <i class="fa-solid fa-newspaper"></i> Projects
    </button>

    <ul class="project-menu dropdown-menu">
      @foreach($projects as $projects)
      <div class="menu-item" onclick="actionManager(this)" data-type="project-item" data-id={{$projects -> id}}>
        {{$projects -> title}}
      </div>
      @endforeach
      <div class="dropdown-divider"></div>
      <div class="menu-item"><a href="<?php echo URL::to('projects'); ?>"><i class="fa-solid fa-arrow-up-right-from-square"></i> Create new project </a></div>
    </ul>

    <button data-type="tags" class="tags btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false" type="button">
      <i class="fa-solid fa-tag"></i> Tags
    </button>

    <ul class="dropdown-menu">
      @foreach($tags as $tags)
      <div class="menu-item" onclick="actionManager(this)" data-type="tags-item" data-id={{$tags -> id}}>
        {{$tags -> title}}
      </div>
      @endforeach
      <div class="dropdown-divider"></div>
      <div class="menu-item"><a href="<?php echo URL::to('tags'); ?>"><i class="fa-solid fa-arrow-up-right-from-square"></i> Create new tag </a></div>
    </ul>

    <button data-type="auto-stop" data-action="open-modal" onclick="actionManager(this)" data-bs-toggle="modal" data-bs-target="#auto-stop-modal" class="auto-stop btn btn-outline-dark" type="button">
      <i class="fa-solid fa-stopwatch"></i> Auto
    </button>

    <div data-type="timer" class="timer btn btn-outline-dark">
      00:00:00
    </div>

    <button data-type="ctrl-btn" onclick="actionManager(this)" class="ctrl btn btn-outline-dark rounded-end" type="button">
      <i class="fa-solid fa-plus"></i> Create
    </button>

    <button data-type="options" class="options btn btn-outline-dark rounded-end d-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
    <ul class="dropdown-menu">
      <div class="menu-item" data-type="delete-activity" onclick="actionManager(this)" href="#"><i class="fa-solid fa-trash"></i> Delete</div>
      <div class="menu-item" data-type="close-activity" onclick="actionManager(this)" href="#"><i class="fa-solid fa-lock"></i> Close</div>
    </ul>

  </div>

  <!--- Activity Group menu -->
  <div id="project-cards" class="row">
    <div id="project-card-id" class="col-sm-3 pt-3 d-none">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title text-center text-uppercase">Titulo</h6>
          <p class="card-text text-center ">Descrição</p>
          <h4 class="proj-timer text-center">00:00</h4>
        </div>
      </div>
    </div>
  </div>

  <!-- Sub-activity menu  -->

  <div id="sub-act-id" class="sub-activity-row input-group d-none">

    <div class="sub-activities btn btn-outline-dark">
      id
    </div>
    <div class="btn title-row">
      Start:
    </div>

    <input type="time" class="manual-time start-time activity-title form-control btn-outline-dark input-row" />

    <div class="title-row btn">
      End:
    </div>

    <input type="time" class="manual-time end-time activity-title form-control btn-outline-dark input-row" />

    <button data-type="changeSubactTime" onclick="actionManager(this)" class="save btn btn-outline-dark" type="button">
      <i class="fa-solid fa-floppy-disk"></i></button>

    <button data-type="del-subact" class="del-subact btn btn-outline-dark rounded-end" onclick="actionManager(this)" type="button">
      <i class="fa-solid fa-trash"></i></button>

  </div>

  <!-- Date-activity menu  -->

  <div id="calendar-act-id" class="calendar-activity-row input-group d-none">
    <div class="title-row btn">
      Date:
    </div>

    <input type="date" class="manual-date activity-title form-control btn-outline-dark input-row" />
    <button data-type="update-calendar" onclick="actionManager(this)" class="save btn btn-outline-dark" type="button">
      <i class="fa-solid fa-floppy-disk"></i>
    </button>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="auto-stop-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Stop this timer automatically at</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <input type="time" name="auto-stop-input" id="auto-stop-time" value="23:59:00">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" onclick="actionManager(this)" data-type="auto-stop" data-action="new-auto-stop" data-bs-dismiss="modal" act-id="id" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

<!-- Alert message  -->
<div id="alert" class="alert hidden-alert alert-primary" role="alert">
    This is a primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>

  <br />

  <div id="resume-table" class="resume-table">
  </div>
</div>

<!-- Axios JS -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- Tracker Page JS -->

<script>
  const apiURL = '<?php echo URL::to('/'); ?>' + '/api/';
  let serverTime = '<?php echo gmdate("Y-m-d\TH:i:s\Z") ?>';
  const user = '<?php echo Auth::user()->name; ?>';
</script>

<script src="<?php echo URL::to('/'); ?>/js/tracker_script.js"></script>

@endsection