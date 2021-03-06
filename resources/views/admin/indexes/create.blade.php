@extends('admin.layouts.master')
@section('title','Quản lý danh sách chỉ số')
@section('feature-title', 'Thêm mới chỉ số')
@section('back-page')
	<p><a href="{{route('index.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('index.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Tên chỉ số</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền tên chỉ số"
							required>
					@if ($errors->has('name'))
					<span class="help-block">
						<strong>{{ $errors->first('name') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('unit') ? ' has-error' : '' }}">
					<label for="unit">Đơn vị</label>
					<input 	id="unit" 
							type="text" 
							class="form-control" 
							name="unit" 
							value="{{ old('unit') }}"
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