@extends('admin.layouts.master')
@section('title', 'Quản lý thuốc')
@section('feature-title', 'Thông tin thuốc')
@section('back-page')
	<p><a href="{{route('room.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="row">
		<div class="col-lg-10 col-lg-offset-1">
			<div class="box box-primary">
				<!-- form start -->
				<div class="box-body">
					<form id="formEdit" role="form" method="POST" action="{{ route('room.update', $room->id) }}">
						{{ csrf_field() }}
						<input name="_method" type="hidden" value="PUT">
						<div class="form-group">
							<label for="id">Mã phòng</label>
							<input type="text" 
							class="form-control" 
							name="id" 
							value="{{ $room->id }}"
							disabled>
						</div>

						<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
							<label for="name">Tên phòng</label>
							<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ $room->name }}"
							placeholder="Điền tên phòng">
							@if ($errors->has('name'))
							<span class="help-block">
								<strong>{{ $errors->first('name') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('limit') ? ' has-error' : '' }}">
							<label for="limit">Số lượng bệnh nhân tối đa</label>
							<input 	id="limit" 
							type="number" 
							class="form-control" 
							name="limit" 
							value="{{ $room->limit }}"
							placeholder="Điền số lượng bệnh nhân tối đa"
							required>
							@if ($errors->has('limit'))
							<span class="help-block">
								<strong>{{ $errors->first('limit') }}</strong>
							</span>
							@endif
						</div>

						<div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
							<label for="description">Ghi chú</label>
							<input 	id="description" 
							type="text" 
							class="form-control" 
							name="description" 
							value="{{ $room->description }}"
							placeholder="Điền ghi chú">
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
					 		<form id="deleteForm" role="form" method="POST" action="{{ route('room.destroy', $room->id) }}">
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