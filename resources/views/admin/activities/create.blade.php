@extends('admin.layouts.master')
@section('title','Quản lý hoạt động điều trị')
@section('feature-title', 'Thêm mới hoạt động điều trị')
@section('back-page')
	<p><a href="{{route('activity.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('activity.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Tên hoạt động</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền tên hoạt động"
							required>
					@if ($errors->has('name'))
					<span class="help-block">
						<strong>{{ $errors->first('name') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('content') ? ' has-error' : '' }}">
					<label for="content">Nội dung</label>
					<textarea	id="content" 
								class="form-control" 
								name="content" 
								placeholder="Điền nội dung hoạt động"
								required>{{old('content')}}</textarea>
					@if ($errors->has('content'))
					<span class="help-block">
						<strong>{{ $errors->first('content') }}</strong>
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