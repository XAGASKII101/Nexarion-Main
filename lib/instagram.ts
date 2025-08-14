export interface InstagramAccount {
  id: string
  username: string
  account_type: "PERSONAL" | "BUSINESS"
  media_count: number
}

export interface InstagramMedia {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
}

export interface InstagramComment {
  id: string
  text: string
  username: string
  timestamp: string
  media_id: string
}

export class InstagramClient {
  private accessToken: string
  private baseUrl = "https://graph.instagram.com"

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getAccount(): Promise<InstagramAccount> {
    const response = await fetch(
      `${this.baseUrl}/me?fields=id,username,account_type,media_count&access_token=${this.accessToken}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram account")
    }

    return response.json()
  }

  async getMedia(limit = 25): Promise<InstagramMedia[]> {
    const response = await fetch(
      `${this.baseUrl}/me/media?fields=id,media_type,media_url,permalink,caption,timestamp&limit=${limit}&access_token=${this.accessToken}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram media")
    }

    const data = await response.json()
    return data.data || []
  }

  async getComments(mediaId: string): Promise<InstagramComment[]> {
    const response = await fetch(
      `${this.baseUrl}/${mediaId}/comments?fields=id,text,username,timestamp&access_token=${this.accessToken}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram comments")
    }

    const data = await response.json()
    return data.data || []
  }

  async replyToComment(commentId: string, message: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${commentId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        access_token: this.accessToken,
      }),
    })

    return response.ok
  }

  async sendDirectMessage(userId: string, message: string): Promise<boolean> {
    // Note: This requires Instagram Messaging API which has strict approval requirements
    const response = await fetch(`${this.baseUrl}/me/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipient: { id: userId },
        message: { text: message },
        access_token: this.accessToken,
      }),
    })

    return response.ok
  }

  static getAuthUrl(clientId: string, redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "user_profile,user_media",
      response_type: "code",
      ...(state && { state }),
    })

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`
  }

  static async exchangeCodeForToken(
    clientId: string,
    clientSecret: string,
    code: string,
    redirectUri: string,
  ): Promise<{ access_token: string; user_id: string }> {
    const response = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange code for token")
    }

    return response.json()
  }
}

export function createInstagramClient(accessToken: string) {
  return new InstagramClient(accessToken)
}
