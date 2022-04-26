<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Http\Controllers\Controller;

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
        return $this->activity::orderBy('actDate', 'asc')->simplePaginate(200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->activity->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return $activity;
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
        return $activity->update($request->all()); //Return true or false
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        return $activity->delete();
    }
}
