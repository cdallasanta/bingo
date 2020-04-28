desc 'git add all and commit'
task :commit, :msg do |task, args|
  message = args.msg
  if message.nil?
    message = "Source updated at #{Time.now}."
  end
  system "git add ."
  system "git commit -m \"#{message}\""
end