<script>
  export let segment;
</script>

<nav class="navbar navbar-light">
  <div class="container">
    <a rel="prefetch" class="navbar-brand" href=".">Threebot</a>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a
          rel="prefetch"
          class="nav-link"
          class:active={segment === '/'}
          href="/">
          Home
        </a>
      </li>

      <li class="nav-item" />
      <li class="nav-item">
        <a
          rel="prefetch"
          href="/blog"
          class="nav-link"
          class:active={segment === '/blog'}>
          <i class="ion-compose" />
          &nbsp;Wiki
        </a>
      </li>
      <li class="nav-item">
        <a
          rel="prefetch"
          href="/contact"
          class="nav-link"
          class:active={segment === '/contact'}>
          <i class="ion-compose" />
          &nbsp; Contact
        </a>
      </li>
      <!-- <li class="nav-item">
        <a
          rel="prefetch"
          href="/settings"
          class="nav-link"
          class:active={segment === '/settings'}>
          <i class="ion-gear-a" />
          &nbsp;Settings
        </a>
      </li> -->

    </ul>
  </div>
</nav>
