const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

/**
 * 调用Bazi MCP获取八字排盘信息
 * @param {string} solarDatetime - ISO格式的阳历时间
 * @param {number} gender - 性别 (0-女, 1-男)
 * @returns {Promise<Object>} 八字排盘结果
 */
const getBaziDetail = async (solarDatetime, gender) => {
  try {
    // 这里应该调用MCP服务，暂时返回模拟数据
    // 实际项目中需要集成真实的MCP调用
    return {
      success: true,
      data: {
        bazi: "甲子 丙寅 戊辰 庚午",
        wuxing: {
          wood: 2,
          fire: 2,
          earth: 2,
          metal: 1,
          water: 1
        },
        datetime: solarDatetime,
        gender: gender
      }
    };
  } catch (error) {
    console.error('获取八字信息失败:', error);
    throw new Error('八字排盘服务暂时不可用');
  }
};

/**
 * 调用DeepSeek V3模型进行命理分析
 * @param {Object} baziData - 八字排盘数据
 * @returns {Promise<Object>} 命理分析结果
 */
const getFortuneAnalysis = async (baziData) => {
  try {
    const prompt = `请根据以下八字信息进行详细的命理分析：

八字：${baziData.bazi}
五行分布：木${baziData.wuxing.wood}，火${baziData.wuxing.fire}，土${baziData.wuxing.earth}，金${baziData.wuxing.metal}，水${baziData.wuxing.water}
性别：${baziData.gender === 1 ? '男' : '女'}

请从以下几个方面进行分析：
1. 五行属性分析
2. 性格特点速览
3. 感情缘分简析（包括理想伴侣特征和桃花运势概述）
4. 事业发展方向
5. 财运基础分析

请用专业但易懂的语言进行解读，每个方面都要详细分析。`;

    const response = await axios.post(process.env.ARK_API_URL, {
      model: process.env.ARK_MODEL,
      messages: [
        {
          role: "system",
          content: "你是一位专业的命理师，精通八字和紫薇斗数。请根据用户提供的八字信息，给出专业、详细、准确的命理分析。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ARK_API_KEY}`
      }
    });

    return {
      success: true,
      analysis: response.data.choices[0].message.content
    };
  } catch (error) {
    console.error('命理分析失败:', error);
    throw new Error('命理分析服务暂时不可用');
  }
};

// API路由

/**
 * 获取八字排盘信息
 */
app.post('/api/bazi', async (req, res) => {
  try {
    const { birthDate, birthTime, gender } = req.body;
    
    // 验证输入参数
    if (!birthDate || !birthTime || gender === undefined) {
      return res.status(400).json({
        success: false,
        message: '请提供完整的出生信息（出生日期、时间、性别）'
      });
    }

    // 构造ISO格式的时间字符串
    const solarDatetime = `${birthDate}T${birthTime}:00+08:00`;
    
    // 获取八字信息
    const baziResult = await getBaziDetail(solarDatetime, parseInt(gender));
    
    res.json(baziResult);
  } catch (error) {
    console.error('八字排盘错误:', error);
    res.status(500).json({
      success: false,
      message: error.message || '服务器内部错误'
    });
  }
});

/**
 * 获取命理分析报告
 */
app.post('/api/analysis', async (req, res) => {
  try {
    const { baziData } = req.body;
    
    if (!baziData) {
      return res.status(400).json({
        success: false,
        message: '请提供八字数据'
      });
    }

    // 获取命理分析
    const analysisResult = await getFortuneAnalysis(baziData);
    
    res.json(analysisResult);
  } catch (error) {
    console.error('命理分析错误:', error);
    res.status(500).json({
      success: false,
      message: error.message || '服务器内部错误'
    });
  }
});

/**
 * 健康检查接口
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 FutureTell服务器运行在端口 ${PORT}`);
  console.log(`📊 API地址: http://localhost:${PORT}/api`);
});