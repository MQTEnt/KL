@extends('admin.layouts.master')
@section('title','Quản lý danh sách chẩn đoán hình ảnh')
@section('feature-title', 'Thêm mới chẩn đoán hình ảnh')
@section('back-page')
	<p><a href="{{route('image.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('image.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Tên chẩn đoán hình ảnh</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền tên chẩn đoán hình ảnh"
							required>
					@if ($errors->has('name'))
					<span class="help-block">
						<strong>{{ $errors->first('name') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
					<label for="description">Mô tả</label>
					<textarea	id="description" 
								class="form-control" 
								name="description" 
								placeholder="Điền mô tả"
								required>{{old('description')}}</textarea>
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