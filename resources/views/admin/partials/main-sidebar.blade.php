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
    <!-- search form -->
    <form action="#" method="get" class="sidebar-form">
      <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Tìm kiếm...">
        <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </form>
    <!-- /.search form -->
    <!-- sidebar menu: : style can be found in sidebar.less -->
    <ul class="sidebar-menu">
      <li class="header">MENU</li>
      <li class="{{ Request::is('admin/dashboard') ? 'active' : '' }} treeview">
        <a href="{{ route('dashboard.index')}}">
          <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
      </li>
      <li class="{{ Request::is('admin/doctor*')||Request::is('admin/nurse*') ? 'active' : '' }} treeview">
        <a href="#">
          <i class="fa fa-users" aria-hidden="true"></i>
          <span>Quản lý nhân sự</span>
          <span class="pull-right-container">
          </span>
        </a>
        <ul class="treeview-menu">
          <li class="{{ Request::is('admin/doctor*') ? 'active' : '' }}"><a href="{{route('doctor.index')}}"><i class="fa fa-user-md" aria-hidden="true"></i> Quản lý bác sĩ</a></li>
          <li class="{{ Request::is('admin/nurse*') ? 'active' : '' }}"><a href="#"><i class="fa fa-wheelchair" aria-hidden="true"></i> Quản lý điều dưỡng viên</a></li>
        </ul>
      </li>
    </ul>
  </section>
  <!-- /.sidebar -->
</aside>