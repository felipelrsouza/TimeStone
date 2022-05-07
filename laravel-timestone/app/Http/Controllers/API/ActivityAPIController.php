<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ActivityAPIController extends Controller
{
    private $activity;
    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = $this->activity
            ->orderBy('timeList', 'asc')
            ->where('user', '=', Auth::user()->id);
        $response = $query->get();

        return $response;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //$this->activity->create($request->all());
        return $this->activity->create([
            'act_id' => $request->act_id,
            'title' => $request->title,
            'project' => $request->project,
            'tags' => $request->tags,
            'autoStop' => $request->autoStop,
            'isClosed' => $request->isClosed,
            'timeList' => $request->timeList,
            'user' => Auth::user()->id
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        $query = $this->activity;
        $query->where('user', '=', Auth::user()->id);
        $query->orderBy('timeList', 'asc');
        $response = $query->get();

        return 'Success.';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        // $query = $this->activity;
        // $matchThese = ['user' => Auth::user()->id, 'act_id' => $request->id];
        // $query->where($matchThese);
        // return $query->update([
        //     'act_id'   => $request->id,
        //     'title'    => $request->title,
        //     'project'  => $request->project,
        //     'tags'     => $request->tags,
        //     'autoStop' => $request->autoStop,
        //     'isClosed' => $request->isClosed,
        //     'timeList' => $request->timeList,
        // ]);

        return $activity->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();

        return 'Success.';
    }
}
