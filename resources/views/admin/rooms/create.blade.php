@extends('admin.layouts.master')
@section('title','Quản lý phòng khám')
@section('feature-title', 'Thêm mới phòng khám')
@section('back-page')
	<p><a href="{{route('room.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('room.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Tên phòng</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền tên phòng"
							required>
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
							value="{{ old('limit') }}"
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