@extends('admin.layouts.master')
@section('title','Quản lý bác sĩ')
@section('css')
	<!-- Bootstrap Date picker -->
    <link rel="stylesheet" href="/css/datepicker3.css">
@stop
@section('feature-title', 'Thêm mới bác sĩ')
@section('back-page')
	<p><a href="{{route('doctor.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('doctor.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Họ và tên</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền họ và tên bác sĩ"
							required>
					@if ($errors->has('name'))
					<span class="help-block">
						<strong>{{ $errors->first('name') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('dob') ? ' has-error' : '' }}">
					<label for="dob">Ngày sinh <small>(Tháng/Ngày/Năm)</small></label>
					<input 	type="text"
							name="dob"
							class="form-control"
							value="{{ old('dob') }}" 
							id="datepicker"
							placeholder="Điền ngày sinh" 
							required>
					@if ($errors->has('dob'))
					<span class="help-block">
						<strong>{{ $errors->first('dob') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('address') ? ' has-error' : '' }}">
					<label for="address">Địa chỉ</label>
					<input 	id="address" 
							type="text" 
							class="form-control" 
							name="address" 
							value="{{ old('address') }}"
							placeholder="Điền địa chỉ"
							required>
					@if ($errors->has('address'))
					<span class="help-block">
						<strong>{{ $errors->first('address') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
					<label for="phone">Số điện thoại</label>
					<input 	id="phone" 
							type="text" 
							class="form-control" 
							name="phone" 
							value="{{ old('phone') }}"
							placeholder="Điền số điện thoại"
							required>
					@if ($errors->has('phone'))
					<span class="help-block">
						<strong>{{ $errors->first('phone') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
					<label for="email">Email</label>
					<input 	id="email" 
							type="email" 
							class="form-control" 
							name="email" 
							value="{{ old('email') }}"
							placeholder="Điền Email"
							required>
					@if ($errors->has('email'))
					<span class="help-block">
						<strong>{{ $errors->first('email') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
					<label for="password">Password</label>
					<input 	id="password" 
							type="password" 
							class="form-control" 
							name="password" 
							value="{{ old('password') }}"
							placeholder="Điền mật khẩu"
							required>
					@if ($errors->has('password'))
					<span class="help-block">
						<strong>{{ $errors->first('password') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
					<label for="description">Ghi chú</label>
					<input 	id="description" 
							type="text" 
							class="form-control" 
							name="description" 
							value="{{ old('description') }}"
							placeholder="Điền ghi chú">
					@if ($errors->has('description'))
					<span class="help-block">
						<strong>{{ $errors->first('description') }}</strong>
					</span>
					@endif
				</div>
			</div>
			<!-- /.box-body -->

			<div class="box-footer">
				<button type="submit" class="btn btn-primary"><i class="fa fa-share" aria-hidden="true"></i> Tạo</button>
			</div>
		</form>
	</div>
@stop

@section('js')
	<script src="/js/bootstrap/bootstrap-datepicker.js"></script>
    <script>
      //Date picker
      $('#datepicker').datepicker({
        autoclose: true
      });
    </script>
@stop