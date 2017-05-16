@extends('admin.layouts.master')
@section('title', 'Quản lý mức chỉ số')
@section('feature-title', 'Thông tin mức chỉ số')
@section('back-page')
	<p><a href="{{route('index.show', $index->id)}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="row">
		<div class="col-lg-10 col-lg-offset-1">
			<div class="box box-primary">
				<div class="box-header">
					<h3 class="box-title">Thông tin mức</h3>
				</div>
				<!-- form start -->
				<div class="box-body">
					<form id="formEdit" role="form" method="POST" action="{{ route('level.update',['index_id' => $index->id, 'id' => $level->id]) }}">
						{{ csrf_field() }}
						<input name="_method" type="hidden" value="PUT">
						@if ($errors->has('index_id'))
						<div id="alert" class="box">
							<div class="callout callout-danger" style="margin-bottom: 10px!important;">
								<h4><i class="fa fa-info"></i> Lỗi:</h4>
								<strong>{{ $errors->first('index_id') }}</strong>
							</div>
						</div>
						@endif
						<div class="form-group">
							<label for="name">Tên chỉ số</label>
							<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ $index->name }}"
							disabled 
							>
							<input type="hidden" name="index_id" value="{{$index->id}}">
						</div>

						<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
							<label for="name">Tên mức chỉ số</label>
							<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ $level->name }}"
							placeholder="Điền tên mức chỉ số"
							required>
							@if ($errors->has('name'))
							<span class="help-block">
								<strong>{{ $errors->first('name') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('max') ? ' has-error' : '' }}">
							<label for="max">Chỉ số tối đa</label>
							<input 	id="max" 
							type="text" 
							class="form-control" 
							name="max" 
							value="{{ $level->max }}"
							placeholder="Điền chỉ số tối đa"
							required>
							@if ($errors->has('max'))
							<span class="help-block">
								<strong>{{ $errors->first('max') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('min') ? ' has-error' : '' }}">
							<label for="min">Chỉ số tối thiểu</label>
							<input 	id="min" 
							type="text"
							class="form-control" 
							name="min" 
							value="{{ $level->min }}"
							placeholder="Điền chỉ số tối thiểu"
							required>
							@if ($errors->has('min'))
							<span class="help-block">
								<strong>{{ $errors->first('min') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
							<label for="description">Mô tả</label>
							<textarea	id="description" 
							class="form-control" 
							name="description" 
							placeholder="Điền mô tả"
							required>{{$level->description}}</textarea>
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
					 		<form id="deleteForm" role="form" method="POST" action="{{ route('level.destroy',['index_id' => $index->id, 'id' => $level->id]) }}">
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
		});
	</script>
@stop