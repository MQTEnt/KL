@extends('admin.layouts.master')
@section('title', 'Quản lý danh sách chẩn đoán hình ảnh')
@section('feature-title', 'Quản lý danh sách chẩn đoán hình ảnh')
@section('main-content')
<div class="row margin-bottom">
	<div class="col-lg-2">
		<a class="btn btn-block btn-primary" href="{{route('image.create')}}"><i class="fa fa-pencil-square-o"></i> Thêm mới</a>
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
			@if(count($images) > 0)
				Danh sách chẩn đoán hình ảnh
			@else
				Không tìm thấy thông tin
			@endif
		</h3>
		<div class="box-tools">
			<form action="{{route('image.search')}}">
				<div class="input-group input-group-sm" style="width: 200px;">
					<input type="text" name="q" class="form-control pull-right" placeholder="Nhập tên chẩn đoán hình ảnh...">
					<div class="input-group-btn">
						<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- /.box-header -->
	@if(count($images) > 0)
	<div class="box-body table-responsive no-padding">
		<table class="table table-hover">
			<tr>
				<th>ID</th>
				<th>Tên chẩn đoán hình ảnh</th>
				<th>Mô tả</th>
				<th style='text-align: center'>Chi tiết</th>
			</tr>
			@foreach($images as $image)
			<tr style="cursor: pointer">
				<td>{{$image->id}}</td>
				<td>{{$image->name}}</td>
				<td>
					{{str_limit($image->description, 30, '...')}}
				</td>
				<td style='text-align: center'><a href="{{route('image.show', $image->id)}}"><i class="fa fa-chevron-circle-right"></i></a></td>
			</tr>
			@endforeach
		</table>
	</div>
	<div class="box-footer clearfix">
		{{$images->links()}}
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