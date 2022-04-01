        @extends('layouts.master')

        @section('title', 'TimeSTONE')
        @section('content')

        @if(session('msg'))
        <p>{{session('msg')}}</p>
        @endif
        
        <div class="main-content container align-items-center pt-5">
          <h6>Start tracking a new activity:</h6>
          <div id="line-0" class="create-activity-line input-group">
            <button style="display:none;" class="btn btn-outline-secondary" type="button">
              <i class="fa-solid fa-caret-down"></i> 5
            </button>
            <input id="activity-title--0" type="text" class="form-control" placeholder="What are you working on?" required />
            <button id="project--0" onclick="actionManager(this)" class="btn btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false" type="button">
            <i class="fa-solid fa-newspaper"></i> Project (0/{{$projects -> count()}})
            </button>
            <ul class="dropdown-menu">
              @foreach($projects as $projects)
              <div class="menu-item" data-id={{$projects -> id}}>
                {{$projects -> title}}
              </div>
              @endforeach
            </ul>
            <button id="tags--0" onclick="actionManager(this)" class="btn btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false" type="button">
              <i class="fa-solid fa-tag"></i> Tags (0/{{$tags -> count()}})
            </button>
            <ul class="dropdown-menu">
              @foreach($tags as $tags)
              <div class="menu-item" data-id={{$projects -> id}}>
                  {{$tags -> title}}
              </div>
              @endforeach
            </ul>
            <button id="billable--0" onclick="actionManager(this)" class="btn btn-outline-secondary" type="button">
              <i class="fa-solid fa-dollar-sign"></i> Billable
            </button>
            <button style="display: none" class="btn btn-outline-secondary" type="button">
              <i class="fa-solid fa-pencil edit-icon"></i> 00:00 to 00:00
            </button>
            <button style="display: none" class="btn btn-outline-secondary" type="button">
              <i class="fa-solid fa-calendar-days"></i>
            </button>
            <div id="timer--0" onclick="actionManager(this)" class="time line btn btn-outline-secondary">
              00:00:00
            </div>
            <button id="ctrl--0" onclick="actionManager(this)" class="btn ctrl btn-outline-secondary" type="button">
              <i class="fa-solid fa-play"></i> Start
            </button>
            <button class="btn btn-outline-secondary rounded-end" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i> Manual</a>
              </li>
              <li>
                <a class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Delete</a>
              </li>
            </ul>
          </div>
          <br />

          <!-- Modal -->
          <div class="modal fade" id="create-new-project" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Create new project
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Project name:
                  <input type="text" class="form-control" required /> <br>
                  Description:
                  <input type="text" class="form-control" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">Create</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="create-new-tag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Create new tag
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  Tag name:
                  <input type="text" class="form-control" required />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">Create</button>
                </div>
              </div>
            </div>
          </div>

          <div id="resume-table" class="resume-table">
          </div>

        </div>
        

        @endsection