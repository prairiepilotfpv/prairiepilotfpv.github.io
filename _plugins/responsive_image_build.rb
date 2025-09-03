Jekyll::Hooks.register :site, :after_init do
  system("npm run build:images")
end
