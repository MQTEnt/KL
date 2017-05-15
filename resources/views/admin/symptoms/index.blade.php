@extends('admin.layouts.master')
@section('title','Quản lý danh sách triệu chứng cơ năng')
@section('feature-title', 'Quản lý danh sách triệu chứng cơ năng')
@section('main-content')
<div class="row margin-bottom">
	<div class="col-lg-2">
		<a class="btn btn-block btn-primary" href="{{route('symptom.create')}}"><i class="fa fa-pencil-square-o"></i> Thêm mới</a>
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
		<h3 class="box-title">
			@if(count($symptoms) > 0)
				Danh sách triệu chứng cơ năng
			@else
				Không tìm thấy thông tin
			@endif
		</h3>
		<div class="box-tools">
			<form action="{{route('symptom.search')}}">
				<div class="input-group input-group-sm" style="width: 200px;">
					<input type="text" name="q" class="form-control pull-right" placeholder="Nhập triệu chứng...">
					<div class="input-group-btn">
						<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- /.box-header -->
	@if(count($symptoms) > 0)
	<div class="box-body table-responsive no-padding">
		<table class="table table-hover">
			<tr>
				<th>ID</th>
				<th>Tên triệu chứng</th>
				<th>Mô tả</th>
				<th style='text-align: center'>Chi tiết</th>
			</tr>
			@foreach($symptoms as $symptom)
			<tr style="cursor: pointer">
				<td>{{$symptom->id}}</td>
				<td>{{$symptom->name}}</td>
				<td>
					{{str_limit($symptom->description, 30, '...')}}
				</td>
				<td style='text-align: center'><a href="{{route('symptom.show', $symptom->id)}}"><i class="fa fa-chevron-circle-right"></i></a></td>
			</tr>
			@endforeach
		</table>
	</div>
	<div class="box-footer clearfix">
		{{$symptoms->links()}}
	</div>
	@endif
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