@extends('admin.layouts.master')
@section('title','Quản lý bác sĩ')
@section('feature-title', 'Quản lý bác sĩ')
@section('main-content')
<div class="row margin-bottom">
	<div class="col-lg-2">
		<a class="btn btn-block btn-primary" href="{{route('doctor.create')}}"><i class="fa fa-user-plus"></i> Thêm mới</a>
	</div>
</div>
@if(Session::has('alert'))
	<div id="alert" class="box">
		<div class="callout {{Session::get('type')}}" style="margin-bottom: 0!important;">
			<h4><i class="fa fa-info"></i> Thông báo:</h4>
			{{Session::get('alert')}}
		</div>
	</div>
@endif
<!-- table -->
<div class="box">
	<div class="box-header">
		<h3 class="box-title">
			@if(count($doctors) > 0)
				Danh sách các bác sĩ
			@else
				Không tìm thấy thông tin
			@endif
		</h3>
		<div class="box-tools">
			<form action="{{route('doctor.search')}}">
				<div class="input-group input-group-sm" style="width: 200px;">
					<input type="text" name="q" class="form-control pull-right" placeholder="Nhập tên bác sĩ để tìm kiếm">
					<div class="input-group-btn">
						<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- /.box-header -->
	@if(count($doctors) > 0)
	<div class="box-body table-responsive no-padding">
		<table class="table table-hover">
			<tr>
				<th>ID</th>
				<th>Họ và tên</th>
				<th>Ngày sinh</th>
				<th>Số điện thoại</th>
				<th>Email</th>
				<th style='text-align: center'>Chi tiết</th>
			</tr>
			@foreach($doctors as $doctor)
			<tr style="cursor: pointer">
				<td>{{$doctor->id}}</td>
				<td>{{$doctor->name}}</td>
				<td>{{date_format(date_create($doctor->dob),'m/d/Y')}}</td>
				<td>{{$doctor->phone}}</td>
				<td>{{$doctor->email}}</td>
				<td style='text-align: center'><a href="{{route('doctor.show', $doctor->id)}}"><i class="fa fa-chevron-circle-right"></i></a></td>
			</tr>
			@endforeach
		</table>
	</div>
	<div class="box-footer clearfix">
		{{$doctors->links()}}
	</div>
	<!-- /.box-body -->
	@endif
</div>
<!-- /.table -->

@stop

@section('js')
<script>
	$(document).ready(function(){
		//Alert effect
		$('#alert').fadeOut(5000);

		//Pagination
		$('ul.pagination').addClass('pagination pagination-sm no-margin pull-right');
	});
</script>
@stop