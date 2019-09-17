class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id] )
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @new_messages = @messages.where('id > ?', params[:id])

  end
end