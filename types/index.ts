interface UserType {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  admin: boolean;
}

interface FormDataType {
  title: string;
  description: string;
  image: string;
  imageFailed: boolean;
}

interface VoteOptionType {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  monthId: number;
  numberOfVotes: number;
  submissionTimestamp: string;
}
