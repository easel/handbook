#!/usr/bin/env ruby

begin
  require 'rubygems'
  require 'shellwords'
  require 'json'
  require 'colorize'
rescue
  abort("Please run 'gem install json colorize'")
end

def shell(command)
  result = %x[#{command}]
  abort("Failed to run command: ".red + "#{command}") unless $?.exitstatus === 0
  result
end

shell("git remote update > /dev/null 2>&1")

_, org, repo = `git config --get remote.origin.url`.match(/github\.com(\/|:)([\w\.\-_]+)\/([\w\-_\.]+)\.git/).captures rescue nil

user = `git config --get github.user`.strip

access_token = `git config --get github.token`.strip

abort("Please run 'git config --global --add github.user YOURUSERNAME'".red) if user.empty?
abort("Please run 'git config --global --add github.token YOURTOKEN' getting a Personal Access Token from https://github.com/settings/applications".red) if access_token.empty?
abort("Invalid github origin remote".red) unless org && repo

pull_request_id = ARGV[0]


$pull_requests = JSON.parse(shell("curl -u '#{user}:#{access_token}' https://api.github.com/repos/#{org}/#{repo}/pulls 2>/dev/null"))

def merge_pull_request(pull_request_id)
  pull_request = $pull_requests.find { |pr| pr['number'].to_s == pull_request_id.to_s }
  abort("Unknown Pull Request: #{pull_request_id}".red) unless pull_request

  if pull_request['state'] == 'open'
    commit_message = "#{pull_request['title']}\n\n#{pull_request['body']}\n\n- Fixes ##{pull_request['number']}"
    shell(%Q[git merge --squash origin/pr/#{pull_request['number']}])
    shell(%Q[git commit -m #{commit_message.shellescape}])

    puts "\nSuccessfully Merged Pull Request: ".green + "##{pull_request['number']} - #{pull_request['title']}".yellow
    puts "  You can now run ".light_black + "git push".yellow
  else
    abort("Pull request is not open".red)
  end
end

if pull_request_id
  merge_pull_request(pull_request_id)
else
  puts "# Available Pull Requests".yellow
  $pull_requests.each do |pull_request|
    next unless pull_request['state'] === 'open'

    puts "  #{pull_request['number']})".green + " #{pull_request['title']}"
  end

  puts ""
  print "Which Pull Request would you like to merge? ".yellow
  input = gets.strip
  puts "\n"
  merge_pull_request(input)  
end
