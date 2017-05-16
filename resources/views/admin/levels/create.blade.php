@extends('admin.layouts.master')
@section('title','Quản lý mức chỉ số')
@section('feature-title', 'Thêm mới mức chỉ số')
@section('back-page')
	<p><a href="{{route('index.show', $index->id)}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang thông tin chỉ số</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('level.store', $index->id) }}">
			{{ csrf_field() }}
			<div class="box-body">
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
							value="{{ old('name') }}"
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
							value="{{ old('max') }}"
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
							value="{{ old('min') }}"
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