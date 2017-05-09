@extends('admin.layouts.master')
@section('title','Quản lý điều dưỡng viên')
@section('feature-title', 'Quản lý điều dưỡng viên')
@section('main-content')
<div class="row margin-bottom">
	<div class="col-lg-2">
		<a class="btn btn-block btn-primary" href="{{route('nurse.create')}}"><i class="fa fa-user-plus"></i> Thêm mới</a>
	</div>
</div>
@if(Session::has('alert'))
	<div id="alert" class="box">
		<div class="callout callout-success" style="margin-bottom: 0!important;">
			<h4><i class="fa fa-info"></i> Thông báo:</h4>
			{{Session::get('alert')}}
		</div>
	</div>
@endif
<!-- table -->
<div class="box">
	<div class="box-header">
		<h3 class="box-title">Danh sách các điều dưỡng viên</h3>
		<div class="box-tools">
			<form action="{{route('nurse.search')}}">
				<div class="input-group input-group-sm" style="width: 200px;">
					<input type="text" name="q" class="form-control pull-right" placeholder="Nhập tên điều dưỡng viên...">
					<div class="input-group-btn">
						<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- /.box-header -->
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
			@foreach($nurses as $nurse)
			<tr style="cursor: pointer">
				<td>{{$nurse->id}}</td>
				<td>{{$nurse->name}}</td>
				<td>{{date_format(date_create($nurse->dob),'m/d/Y')}}</td>
				<td>{{$nurse->phone}}</td>
				<td>{{$nurse->email}}</td>
				<td style='text-align: center'><a href="{{route('nurse.show', $nurse->id)}}"><i class="fa fa-chevron-circle-right"></i></a></td>
			</tr>
			@endforeach
		</table>
	</div>
	<div class="box-footer clearfix">
		{{$nurses->links()}}
	</div>
	<!-- /.box-body -->
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