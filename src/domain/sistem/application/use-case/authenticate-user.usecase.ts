import { Either, left, right } from '@/core/either'
import { HashCompare } from '../cryptography/hash-compare'
import { UserRepository } from '../repositories/user.repository'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCreadentialsError } from './errors/wrong-credentials.error'

interface AuthenticateUserUseCaseRequest {
  userName: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCreadentialsError,
  { accessToken: string }
>

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    userName,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByName(userName)

    if (!user) {
      return left(new WrongCreadentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCreadentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({ accessToken })
  }
}
