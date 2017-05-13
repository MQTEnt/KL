@extends('admin.layouts.master')
@section('title','Quản lý thuốc')
@section('feature-title', 'Thêm mới thuốc')
@section('back-page')
	<p><a href="{{route('medicine.index')}}"><i class="fa fa-chevron-left" aria-hidden="true"></i> Trở lại trang danh sách</a></p>
@stop
@section('main-content')
	<div class="box box-primary">
		<!-- form start -->
		<form role="form" method="POST" action="{{ route('medicine.store') }}">
			{{ csrf_field() }}
			<div class="box-body">
				<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
					<label for="name">Tên thuốc</label>
					<input 	id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{{ old('name') }}"
							placeholder="Điền tên thuốc"
							required>
					@if ($errors->has('name'))
					<span class="help-block">
						<strong>{{ $errors->first('name') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('indications') ? ' has-error' : '' }}">
					<label for="indications">Chỉ định</label>
					<textarea	id="indications" 
								class="form-control" 
								name="indications" 
								placeholder="Điền chỉ định thuốc"
								required>{{old('indications')}}</textarea>
					@if ($errors->has('indications'))
					<span class="help-block">
						<strong>{{ $errors->first('indications') }}</strong>
					</span>
					@endif
				</div>

				<div class="form-group{{ $errors->has('contraindications') ? ' has-error' : '' }}">
					<label for="contraindications">Chống chỉ định</label>
					<textarea	id="contraindications" 
								class="form-control" 
								name="contraindications" 
								placeholder="Điền chỉ định thuốc"
								required>{{old('contraindications')}}</textarea>
					@if ($errors->has('contraindications'))
					<span class="help-block">
						<strong>{{ $errors->first('contraindications') }}</strong>
					</span>
					@endif
				</div>
				
				<div class="form-group{{ $errors->has('dosage_and_administration') ? ' has-error' : '' }}">
					<label for="dosage_and_administration">Liều lượng và cách dùng</label>
					<textarea	id="dosage_and_administration" 
								class="form-control" 
								name="dosage_and_administration" 
								placeholder="Điền liều lượng và cách dùng"
								required>{{old('dosage_and_administration')}}</textarea>
					@if ($errors->has('dosage_and_administration'))
					<span class="help-block">
						<strong>{{ $errors->first('dosage_and_administration') }}</strong>
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
							placeholder="Điền đơn vị thuốc"
							required>
					@if ($errors->has('unit'))
					<span class="help-block">
						<strong>{{ $errors->first('unit') }}</strong>
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