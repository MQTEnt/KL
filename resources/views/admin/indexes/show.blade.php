@extends('admin.layouts.master')
@section('title', 'Quản lý danh sách chỉ số xét nghiệm')
@section('feature-title', 'Thông tin chỉ số xét nghiệm')
@section('back-page')
	<p><a href="{{route('index.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="row">
		<div class="col-lg-4">
			<div class="box box-primary">
				<div class="box-header">
				<p><a href="{{ route('level.create', $index->id) }}"><i class="fa fa-plus-circle"></i> Thêm mức chỉ số</a></p>
				@if(count($index->levels()->get()) > 0)
					<h3 class="box-title">Các mức của chỉ số</h3>
				@endif
				</div>
				<div class="box-body table-responsive">
				@if(Session::has('alert'))
				<div id="alert" class="box">
					<div class="callout callout-success" style="margin-bottom: 0!important;">
						<h4><i class="fa fa-info"></i> Thông báo:</h4>
						{{Session::get('alert')}}
					</div>
				</div>
				@endif
				@if(count($index->levels()->get()) > 0)
					<table class="table table-hover">
						<tr>
							<th>Tên mức</th>
							<th>Tối đa</th>
							<th>Tối thiểu</th>
							<th style='text-align: center'>Chi tiết</th>
							</tr>
						@foreach($index->levels()->get() as $level)
						<tr style="cursor: pointer">
							<td>{{$level->name}}</td>
							<td>{{$level->max}}</td>
							<td>{{$level->min}}</td>
							<td style='text-align: center'><a href="{{route('level.show', ['index_id' => $index->id, 'id' => $level->id])}}"><i class="fa fa-chevron-circle-right"></i></a></td>
						</tr>
						@endforeach
					</table>
				@endif
				</div>
				<div class="box-footer clearfix">
				</div>
			</div>

		</div>
		<div class="col-lg-8">
			<div class="box box-primary">
				<div class="box-header">
					<h3 class="box-title">Thông tin chỉ số</h3>
				</div>
				<!-- form start -->
				<div class="box-body">
					<form id="formEdit" role="form" method="POST" action="{{ route('index.update', $index->id) }}">
						{{ csrf_field() }}
						<input name="_method" type="hidden" value="PUT">
						<div class="form-group">
							<label for="id">Mã chỉ số</label>
							<input type="text" 
							class="form-control" 
							name="id" 
							value="{{ $index->id }}"
							disabled>
						</div>

						<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
							<label for="name">Tên chỉ số</label>
							<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ $index->name }}"
							placeholder="Điền tên chỉ số">
							@if ($errors->has('name'))
							<span class="help-block">
								<strong>{{ $errors->first('name') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('unit') ? ' has-error' : '' }}">
							<label for="unit">Tên đơn vị</label>
							<input 	id="unit" 
							type="text" 
							class="form-control" 
							name="unit" 
							value="{{ $index->unit }}"
							placeholder="Điền đơn vị"
							required>
							@if ($errors->has('unit'))
							<span class="help-block">
								<strong>{{ $errors->first('unit') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
							<label for="description">Mô tả</label>
							<textarea	id="description" 
							class="form-control" 
							name="description" 
							placeholder="Điền mô tả"
							required>{{$index->description}}</textarea>
							@if ($errors->has('description'))
							<span class="help-block">
								<strong>{{ $errors->first('description') }}</strong>
							</span>
							@endif
						</div>
					</form>
				</div>
				<!-- /.box-body -->

				<div class="box-footer">
					<div class="col-lg-6">
						<button id="btnUpdate" type="button" class="btn btn-primary btn-block"><i class="fa fa-share"></i> Cập nhật</button>
					</div>
					<div class="col-lg-6">
						<button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#alertModal"><i class="fa fa-trash-o"></i> <b>Xóa</b></button>
					</div>
					<!-- Modal Alert -->
					<div class="modal fade" id="alertModal" role="dialog">
					 	<div class="modal-dialog modal-sm">
					 		<form id="deleteForm" role="form" method="POST" action="{{ route('index.destroy', $index->id) }}">
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
			</div>
		</div>
	</div>
@stop

@section('js')
	<script>
		$(document).ready(function(){
			$('#btnUpdate').click(function(){
				$('#formEdit').submit();
			})

			//Alert effect
			$('#alert').fadeOut(5000);
		});
	</script>
@stop