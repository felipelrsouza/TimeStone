        @extends('layouts.master')

        @section('title', 'Tracker')
        @section('content')

        @if(session('msg'))
        <p>{{session('msg')}}</p>
        @endif

        <div class="main-content container align-items-center pt-5">
          <h6>Start tracking a new activity:</h6>

          <!-- Activity menu  -->

          <div id="activity-row-id" class="input-group">

            <button class="sub-activities btn btn-outline-dark btn-secondary d-none" data-type="sub-activities" onclick="actionManager(this)" type="button">
              <i class="fa-solid fa-caret-down"></i> n
            </button>

            <input data-type="activity-title" onkeyup="actionManager(this)" type="text" class="activity-title form-control input-line rounded-start" placeholder="What are you working on?" />

            <button data-type="project" class="project btn btn-outline-dark" data-bs-toggle="dropdown" aria-expanded="false" type="button">
              <i class="fa-solid fa-newspaper"></i> Projects
            </button>

            <ul class="dropdown-menu">
              @foreach($projects as $projects)
              <div class="menu-item" onclick="actionManager(this)" data-type="project-item" data-id={{$projects -> id}}>
                {{$projects -> title}}
              </div>
              @endforeach
              <div class="dropdown-divider"></div>
              <div class="menu-item"><a href="/projects"><i class="fa-solid fa-arrow-up-right-from-square"></i> Create new project </a></div>
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
              <div class="menu-item"><a href="/tags"><i class="fa-solid fa-arrow-up-right-from-square"></i> Create new tag </a></div>
            </ul>

            <button data-type="billable" onclick="actionManager(this)" class="billable btn btn-outline-dark" type="button">
              <i class="fa-solid fa-dollar-sign"></i> Billable
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

          <br />

          <div id="resume-table" class="resume-table">
          </div>

        </div>
        <!-- Axios JS -->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

        <!-- Tracker Page JS -->
        <script src="/js/tracker_script.js"></script>

        @endsection