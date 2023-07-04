class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_type, :notifications

  has_many :appointments


  def user_type
    'Client'
  end
end