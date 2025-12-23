<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Agence104\LiveKit\AccessTokenOptions;
use Agence104\LiveKit\AccessToken;
use Agence104\LiveKit\VideoGrant;

class LiveKitController extends Controller
{
    public function getToken(Request $request)
    {
        $request->validate([
            'room' => 'required|string',
            'username' => 'required|string',
        ]);

        $roomName = $request->input('room');
        $participantName = $request->input('username');

        $apiKey = env('LIVEKIT_API_KEY');
        $apiSecret = env('LIVEKIT_API_SECRET');
        $livekitUrl = env('LIVEKIT_URL');

        if (!$apiKey || !$apiSecret) {
            return response()->json(['error' => 'LiveKit API credentials are not set.'], 500);
        }

        try {
            $tokenOptions = (new AccessTokenOptions())
                ->setIdentity($participantName)
                ->setName($participantName);

            $videoGrant = (new VideoGrant())
                ->setRoomJoin(true)
                ->setRoomName($roomName);

            $token = new AccessToken($apiKey, $apiSecret);
            $token->init($tokenOptions);
            $token->setGrant($videoGrant);

            return response()->json([
                'token' => $token->toJwt(),
                'url' => $livekitUrl ?: null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate LiveKit token',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
