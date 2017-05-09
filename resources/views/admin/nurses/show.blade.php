@extends('admin.layouts.master')
@section('title','Quản lý điều dưỡng viên')
@section('css')
	<!-- Bootstrap Date picker -->
    <link rel="stylesheet" href="/css/datepicker3.css">
@stop
@section('feature-title', 'Thông tin điều dưỡng viên')
@section('back-page')
	<p><a href="{{route('nurse.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="row">
		<div class="col-lg-4">
			<div class="box box-primary">
				<div class="box-body box-profile">
					<img class="profile-user-img img-responsive img-circle" src="/img/nurse.png">

					<h3 class="profile-username text-center">{{$nurse->name}}</h3>

					<p class="text-muted text-center">Điều dưỡng viên</p>

					<ul class="list-group list-group-unbordered">
						<li class="list-group-item">
							<b>Ngày tạo tài khoản</b> <span class="pull-right">{{$nurse->created_at}}</span>
						</li>
						<li class="list-group-item">
							<b>Ngày cập nhật mới nhất</b> <span class="pull-right">{{$nurse->updated_at}}</span>
						</li>
					</ul>
					<button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#alertModal"><i class="fa fa-trash-o"></i> <b>Xóa</b></button>
					<!-- Modal Alert -->
					<div class="modal fade" id="alertModal" role="dialog">
					 	<div class="modal-dialog modal-sm">
					 		<form id="deleteForm" role="form" method="POST" action="{{ route('nurse.destroy', $nurse->id) }}">
								{{ csrf_field() }}
								<input name="_method" type="hidden" value="DELETE">
						 		<div class="modal-content">
						 			<div class="modal-header">
						 				<h4 class="modal-title">Thông báo</h4>
						 			</div>
						 			<div class="modal-body">
						 				<p><i class="fa fa-trash" aria-hidden="true"></i> Bạn có chắc muốn xóa?</p>
						 			</div>
						 			<div class="modal-footer">
						 				<button type="submit" class="btn btn-success">Đồng ý</button>
						 				<button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
						 			</div>
						 		</div>
						 	</form>
					 	</div>
					</div>
				</div>
				<!-- /.box-body -->
			</div>
		</div>
		<div class="col-lg-8">
			<div class="box box-primary">
				<!-- form start -->
				<form role="form" method="POST" action="{{ route('nurse.update', $nurse->id) }}">
					{{ csrf_field() }}
					<input name="_method" type="hidden" value="PUT">
					<div class="box-body">
						<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
							<label for="name">Họ và tên</label>
							<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ $nurse->name }}"
							placeholder="Điền họ và tên điều dưỡng viên"
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
							value="{{ date_format(date_create($nurse->dob),'m/d/Y') }}" 
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
							value="{{ $nurse->address }}"
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
							value="{{ $nurse->phone }}"
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
							value="{{ $nurse->email }}"
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
							value="{{ $nurse->password }}"
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
							value="{{ $nurse->description }}"
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
						<button type="submit" class="btn btn-primary btn-block"><i class="fa fa-share" aria-hidden="true"></i> Cập nhật</button>
					</div>
				</form>
			</div>
		</div>
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