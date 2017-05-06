@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Welcome</div>

                <div class="panel-body">
                    Chào mừng tới trang chủ,
                    @if (Auth::guest())
                        <p><a href="{{ url('/login') }}"><i class="fa fa-btn fa-sign-in"></i> Đăng nhập vào hệ thống</a></p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
