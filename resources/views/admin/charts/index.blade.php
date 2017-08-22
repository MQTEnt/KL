@extends('admin.layouts.master')
@section('title','Thống kê')
@section('feature-title', 'Thống kê')
@section('main-content')
<!-- table -->
<div class="box">
	<div class="box-header">
		<!-- <h3 class="box-title">
			Thống kê
		</h3> -->
	</div>
	<!-- /.box-header -->
	<div class="box-body no-padding">
		<div id="chart" class="container">
		</div>
	</div>
	<div class="box-footer clearfix">
	</div>
	<!-- /.box-body -->
</div>
<!-- /.table -->
@stop

@section('js')
<script src="/js/app/admin/charts/bundle.js"></script>
@stop