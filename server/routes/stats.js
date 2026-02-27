const express = require('express');
const router = express.Router();
const { dbOperations } = require('../supabase-db');
const { authMiddleware } = require('../auth');

// 获取用户统计
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const stats = await dbOperations.getUserStats(userId);
    
    res.json({
      success: true,
      stats: stats || {
        total_recommendations: 0,
        accepted_recommendations: 0,
        challenges_completed: 0,
        foods_explored: 0
      }
    });
  } catch (error) {
    console.error('获取用户统计失败:', error);
    res.status(500).json({
      success: false,
      error: '获取统计失败'
    });
  }
});

// 记录推荐
router.post('/recommendation', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { foodName, foodType, accepted, rating } = req.body;
    
    // 添加推荐历史
    await dbOperations.addRecommendation(userId, foodName, foodType, accepted, rating);
    
    // 更新统计
    await dbOperations.updateStats(userId, {
      total_recommendations: accepted ? 1 : 0,
      accepted_recommendations: accepted ? 1 : 0,
      foods_explored: 1
    });
    
    res.json({
      success: true,
      message: '推荐记录已保存'
    });
  } catch (error) {
    console.error('记录推荐失败:', error);
    res.status(500).json({
      success: false,
      error: '记录推荐失败'
    });
  }
});

// 获取推荐历史
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await dbOperations.getRecommendationHistory(userId);
    
    res.json({
      success: true,
      history: history || []
    });
  } catch (error) {
    console.error('获取推荐历史失败:', error);
    res.status(500).json({
      success: false,
      error: '获取推荐历史失败'
    });
  }
});

// 记录挑战
router.post('/challenge', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { challengeName, result } = req.body;
    
    // 添加挑战记录
    await dbOperations.addChallenge(userId, challengeName, result);
    
    // 更新统计
    if (result === '成功') {
      await dbOperations.updateStats(userId, {
        challenges_completed: 1
      });
    }
    
    res.json({
      success: true,
      message: '挑战记录已保存'
    });
  } catch (error) {
    console.error('记录挑战失败:', error);
    res.status(500).json({
      success: false,
      error: '记录挑战失败'
    });
  }
});

// 获取挑战历史
router.get('/challenges', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await dbOperations.getChallengeHistory(userId);
    
    res.json({
      success: true,
      history: history || []
    });
  } catch (error) {
    console.error('获取挑战历史失败:', error);
    res.status(500).json({
      success: false,
      error: '获取挑战历史失败'
    });
  }
});

module.exports = router;
