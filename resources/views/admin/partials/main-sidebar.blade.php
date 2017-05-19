<aside class="main-sidebar">
  <!-- sidebar: style can be found in sidebar.less -->
  <section class="sidebar">
    <!-- Sidebar user panel -->
    <div class="user-panel">
      <div class="pull-left image">
        <img src="/img/user.png" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p>{{$admin->name}}</p>
        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
      </div>
    </div>
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu">
      <li class="header">MENU</li>
      <li class="{{ Route::is('admin.dashboard.index') ? 'active' : '' }} treeview">
        <a href="{{ route('admin.dashboard.index')}}">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>
      <li class="{{ Route::is('doctor.*')||Route::is('nurse.*') ? 'active' : '' }} treeview">
        <a href="#">
          <i class="fa fa-users" aria-hidden="true"></i>
          <span>Quản lý nhân sự</span>
          <span class="pull-right-container">
          </span>
        </a>
        <ul class="treeview-menu">
          <li class="{{ Route::is('doctor.*') ? 'active' : '' }}"><a href="{{route('doctor.index')}}"><i class="fa fa-user-md"></i> Quản lý bác sĩ</a></li>
          <li class="{{ Route::is('nurse.*') ? 'active' : '' }}"><a href="{{route('nurse.index')}}"><i class="fa fa-female"></i> Quản lý điều dưỡng viên</a></li>
        </ul>
      </li>
      <li class="{{ Route::is('medicine.*') ? 'active' : '' }} treeview">
        <a href="{{ route('medicine.index')}}">
          <i class="fa fa-medkit"></i> <span>Quản lý thuốc</span>
        </a>
      </li>
      <li class="{{ Route::is('room.*') ? 'active' : '' }} treeview">
        <a href="{{ route('room.index')}}">
          <i class="fa fa-building"></i> <span>Quản lý phòng khám</span>
        </a>
      </li>
      <li class="{{ Route::is('activity.*') ? 'active' : '' }} treeview">
        <a href="{{ route('activity.index')}}">
          <i class="fa fa-calendar"></i> <span>Quản lý hoạt động điều trị</span>
        </a>
      </li>
      <li class="{{ Route::is('symptom.*')||Route::is('sign.*')||Route::is('index.*')||Route::is('exploration.*')||Route::is('image.*') ? 'active' : '' }} treeview">
        <a href="#">
          <i class="fa fa-list-ul"></i></i>
          <span>Quản lý danh mục khám bệnh</span>
          <span class="pull-right-container">
          </span>
        </a>
        <ul class="treeview-menu">
          <li class="{{ Route::is('symptom.*') ? 'active' : '' }}"><a href="{{route('symptom.index')}}"><i class="fa fa-comment"></i> Quản lý triệu chứng cơ năng</a></li>
        </ul>
        <ul class="treeview-menu">
          <li class="{{ Route::is('sign.*') ? 'active' : '' }}"><a href="{{route('sign.index')}}"><i class="fa fa-eye"></i> Quản lý triệu chứng thực thể</a></li>
        </ul>
        <ul class="treeview-menu">
          <li class="{{ Route::is('index.*') ? 'active' : '' }}"><a href="{{route('index.index')}}"><i class="fa fa-tint"></i> Quản lý chỉ số xét nghiệm</a></li>
        </ul>
        <ul class="treeview-menu">
          <li class="{{ Route::is('exploration.*') ? 'active' : '' }}"><a href="{{route('exploration.index')}}"><i class="fa fa-stethoscope"></i> Quản lý thăm dò chức năng</a></li>
        </ul>
        <ul class="treeview-menu">
          <li class="{{ Route::is('image.*') ? 'active' : '' }}"><a href="{{route('image.index')}}"><i class="fa fa-film"></i> Quản lý chẩn đoán hình ảnh</a></li>
        </ul>
      </li>
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>