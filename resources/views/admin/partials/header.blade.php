<header class="main-header">
  <!-- Logo -->
  <a href="{{url('/')}}" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><i style="font-size: 1.5em" class="fa fa-heartbeat" aria-hidden="true"></i></span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg"><i style="font-size: 1.5em" class="fa fa-heartbeat" aria-hidden="true"></i></span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>

    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <!-- User Account: style can be found in dropdown.less -->
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="/img/user.png" class="user-image" alt="User Image">
            <span class="hidden-xs">{{Auth::guard('admin')->user()->name}}</span>
          </a>
          <ul class="dropdown-menu">
            <!-- User image -->
            <li class="user-header">
              <img src="/img/user.png" class="img-circle" alt="User Image">

              <p>
                {{Auth::guard('admin')->user()->name}}
                <small>Tham gia ngày: {{date_format(Auth::guard('admin')->user()->created_at,"d/m/Y")}}</small>
              </p>
            </li>
            <!-- Menu Body -->
            <!-- Menu Footer-->
            <li class="user-footer">
              <div class="pull-left">
                <a href="#" class="btn btn-default btn-flat">Thông tin tài khoản</a>
              </div>
              <div class="pull-right">
                <a href="{{url('/admin/logout')}}" class="btn btn-default btn-flat">Đăng xuất</a>
              </div>
            </li>
          </ul>
        </li>
        <!-- Control Sidebar Toggle Button -->
        <li>
          <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</header>