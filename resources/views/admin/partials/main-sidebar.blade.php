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
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>